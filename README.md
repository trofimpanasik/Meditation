# 🧘 Habit Tracker

Минималистичный трекер привычек на React Native + Expo с системой подписки.

![React Native](https://img.shields.io/badge/React%20Native-0.81-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-54-black?logo=expo)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Возможности

- 📋 **Трекер привычек** — создавайте, редактируйте и отслеживайте ежедневные привычки
- 🎯 **16 иконок** — выбирайте эмодзи для каждой привычки
- 💳 **Система подписки** — paywall с месячной и годовой подпиской
- 🎨 **Современный дизайн** — минималистичный UI с плавными анимациями
- 💾 **Локальное хранение** — данные сохраняются в AsyncStorage

## 📱 Скриншоты

| Onboarding | Paywall | Главный экран |
|:----------:|:-------:|:-------------:|
| Приветственный экран | Выбор подписки | Трекер привычек |

## 🚀 Быстрый старт

### Установка

```bash
# Клонируйте репозиторий
git clone <repo-url>
cd Meditation

# Установите зависимости
npm install

# Запустите проект
npx expo start
```

### Зависимости

```bash
npx expo install @react-native-async-storage/async-storage @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

## 📁 Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── HabitModal.js   # Модалка создания/редактирования
│   └── index.js
│
├── context/            # Глобальное состояние (Context API)
│   ├── SubscriptionContext.js
│   └── index.js
│
├── navigation/         # React Navigation
│   ├── AuthStack.js    # Onboarding → Paywall
│   ├── MainStack.js    # Home
│   ├── RootNavigator.js
│   └── index.js
│
└── screens/            # Экраны приложения
    ├── OnboardingScreen.js
    ├── PaywallScreen.js
    ├── HomeScreen.js
    └── index.js
```

## 🎮 Как использовать

| Действие | Описание |
|----------|----------|
| **Тап** на привычку | Отметить как выполненную |
| **Долгое нажатие** | Редактировать привычку |
| **Кнопка +** | Создать новую привычку |
| **Кнопка ✕** | Удалить привычку |

## 🔐 Логика подписки

```
┌─────────────────┐     ┌─────────────────┐
│   AsyncStorage  │────▶│  isSubscribed?  │
└─────────────────┘     └────────┬────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
              ┌──────────┐             ┌──────────┐
              │ AuthStack│             │ MainStack│
              │ (Paywall)│             │  (Home)  │
              └──────────┘             └──────────┘
```

- **Не подписан** → показывается `AuthStack` (Onboarding → Paywall)
- **Подписан** → показывается `MainStack` (Home)
- Кнопка «Сбросить подписку» для тестирования

## 🛠 Технологии

- **React Native** — кроссплатформенная разработка
- **Expo** — инструменты и сервисы
- **React Navigation** — навигация между экранами
- **AsyncStorage** — локальное хранилище данных
- **Context API** — управление глобальным состоянием

## 📝 Планы

- [ ] Сохранение привычек в AsyncStorage
- [ ] Статистика выполнения
- [ ] Напоминания (Push Notifications)
- [ ] Темная тема
- [ ] Интеграция с реальными платежами (RevenueCat)

## 📄 Лицензия

MIT © 2024