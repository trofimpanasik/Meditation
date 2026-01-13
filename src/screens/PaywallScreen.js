import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSubscription } from "../context/SubscriptionContext";

const SUBSCRIPTION_OPTIONS = [
  {
    id: "monthly",
    title: "Месяц",
    price: "299 BYN",
    period: "/месяц",
    badge: null,
  },
  {
    id: "yearly",
    title: "Год",
    price: "1 490 BYN",
    period: "/год",
    badge: "Выгода 50%",
  },
];

const PaywallScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const { subscribe } = useSubscription();

  const handlePurchase = async () => {
    // Имитация покупки
    await subscribe();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Выберите подписку</Text>
        <Text style={styles.subtitle}>
          Получите полный доступ ко всем функциям
        </Text>

        <View style={styles.cardsContainer}>
          {SUBSCRIPTION_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.card,
                selectedPlan === option.id && styles.cardSelected,
              ]}
              onPress={() => setSelectedPlan(option.id)}
              activeOpacity={0.8}
            >
              {option.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{option.badge}</Text>
                </View>
              )}

              <View style={styles.radioContainer}>
                <View
                  style={[
                    styles.radio,
                    selectedPlan === option.id && styles.radioSelected,
                  ]}
                >
                  {selectedPlan === option.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{option.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.cardPrice}>{option.price}</Text>
                  <Text style={styles.cardPeriod}>{option.period}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}
          activeOpacity={0.8}
        >
          <Text style={styles.purchaseButtonText}>Купить</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Подписка продлевается автоматически. Отменить можно в любое время.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A2E",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    position: "relative",
    overflow: "visible",
  },
  cardSelected: {
    borderColor: "#6366F1",
    backgroundColor: "#F5F3FF",
  },
  badge: {
    position: "absolute",
    top: -12,
    right: 16,
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  radioContainer: {
    marginRight: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#6366F1",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6366F1",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A2E",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  cardPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6366F1",
  },
  cardPeriod: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  purchaseButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  purchaseButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  disclaimer: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default PaywallScreen;
