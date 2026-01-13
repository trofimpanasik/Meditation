import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { useSubscription } from "../context/SubscriptionContext";
import HabitModal from "../components/HabitModal";

const INITIAL_HABITS = [
  { id: "1", title: "Выпить воды", emoji: "💧", completed: false },
  { id: "2", title: "Йога", emoji: "🧘", completed: false },
  { id: "3", title: "Чтение", emoji: "📚", completed: false },
  { id: "4", title: "Медитация", emoji: "🧠", completed: false },
];

const HomeScreen = () => {
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const { resetSubscription } = useSubscription();

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit,
      ),
    );
  };

  const handleAddHabit = () => {
    setEditingHabit(null);
    setModalVisible(true);
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setModalVisible(true);
  };

  const handleSaveHabit = (habitData) => {
    if (editingHabit) {
      // Редактирование существующей привычки
      setHabits((prev) =>
        prev.map((h) => (h.id === habitData.id ? habitData : h)),
      );
    } else {
      // Добавление новой привычки
      setHabits((prev) => [...prev, habitData]);
    }
  };

  const handleDeleteHabit = (id) => {
    Alert.alert(
      "Удалить привычку",
      "Вы уверены, что хотите удалить эту привычку?",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => {
            setHabits((prev) => prev.filter((h) => h.id !== id));
          },
        },
      ],
    );
  };

  const renderHabitItem = ({ item }) => (
    <TouchableOpacity
      style={styles.habitCard}
      onPress={() => toggleHabit(item.id)}
      onLongPress={() => handleEditHabit(item)}
      activeOpacity={0.7}
    >
      <View style={styles.habitInfo}>
        <Text style={styles.habitEmoji}>{item.emoji}</Text>
        <Text
          style={[
            styles.habitTitle,
            item.completed && styles.habitTitleCompleted,
          ]}
        >
          {item.title}
        </Text>
      </View>

      <View style={styles.habitActions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteHabit(item.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>

        <View
          style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Мои привычки</Text>
            <Text style={styles.progress}>
              {completedCount} из {habits.length} выполнено
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddHabit}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyText}>Нет привычек</Text>
            <Text style={styles.emptySubtext}>
              Нажмите + чтобы добавить первую привычку
            </Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Text style={styles.hintText}>Долгое нажатие для редактирования</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetSubscription}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>Сбросить подписку</Text>
        </TouchableOpacity>
      </View>

      <HabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveHabit}
        habit={editingHabit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  progress: {
    fontSize: 14,
    color: "#6B7280",
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "400",
    marginTop: -2,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexGrow: 1,
  },
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  habitInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  habitEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  habitTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: "#1A1A2E",
    flex: 1,
  },
  habitTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  habitActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "600",
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  hintText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 12,
  },
  resetButton: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
  },
  resetButtonText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HomeScreen;
