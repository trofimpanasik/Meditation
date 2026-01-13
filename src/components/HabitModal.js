import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const EMOJI_OPTIONS = [
  "💧",
  "🧘",
  "📚",
  "🧠",
  "🏃",
  "💪",
  "🥗",
  "😴",
  "🎯",
  "✍️",
  "🎨",
  "🎵",
  "🌱",
  "☀️",
  "🧹",
  "💊",
];

const HabitModal = ({ visible, onClose, onSave, habit }) => {
  const [title, setTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎯");

  useEffect(() => {
    if (habit) {
      setTitle(habit.title);
      setSelectedEmoji(habit.emoji);
    } else {
      setTitle("");
      setSelectedEmoji("🎯");
    }
  }, [habit, visible]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        id: habit?.id || Date.now().toString(),
        title: title.trim(),
        emoji: selectedEmoji,
        completed: habit?.completed || false,
      });
      setTitle("");
      setSelectedEmoji("🎯");
      onClose();
    }
  };

  const isEditing = !!habit;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContainer}>
          <View style={styles.handle} />

          <Text style={styles.modalTitle}>
            {isEditing ? "Редактировать привычку" : "Новая привычка"}
          </Text>

          <Text style={styles.label}>Название</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите название привычки"
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
            maxLength={50}
          />

          <Text style={styles.label}>Иконка</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.emojiContainer}
          >
            {EMOJI_OPTIONS.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={[
                  styles.emojiButton,
                  selectedEmoji === emoji && styles.emojiButtonSelected,
                ]}
                onPress={() => setSelectedEmoji(emoji)}
                activeOpacity={0.7}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                !title.trim() && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              activeOpacity={0.7}
              disabled={!title.trim()}
            >
              <Text style={styles.saveButtonText}>
                {isEditing ? "Сохранить" : "Добавить"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A2E",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1A1A2E",
    marginBottom: 20,
  },
  emojiContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    marginBottom: 24,
  },
  emojiButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  emojiButtonSelected: {
    backgroundColor: "#EEF2FF",
    borderWidth: 2,
    borderColor: "#6366F1",
  },
  emojiText: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#6366F1",
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#C7D2FE",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default HabitModal;
