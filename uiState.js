export const state = {
  isSnoozed: false,
  isMinimized: false,
  seconds: 0,
  userGoal: "",
  currentNoteIndex: 0,
  blockList: [],
  stateSettings: {
    focused: { nudge: "Crushing it! 🔥", avatar: "" },
    distracted: { nudge: "Get off this tab! 😡", avatar: "" },
    out_of_path: { nudge: "Lost in the woods? 🧭", avatar: "" },
    sleepy: { nudge: "Wake up! ☕", avatar: "" }
  }
};

export const notes = [
  "Focus on the task! 🎯", "Drink some water 💧", "Take a deep breath 🌬️",
  "You're doing great! ✨", "Check your posture 🪑", "Progress is progress 📈"
];