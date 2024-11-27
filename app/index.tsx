import "../global.css";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (operator: string) => {
    setEquation((prev) => prev + display + operator);
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation("");
    } catch (error) {
      setDisplay("Error");
    }
  };

  // const clear = () => {
  //   setDisplay("0");
  //   setEquation("");
  // };

  const renderButton = (btn: string, index: number) => (
    <TouchableOpacity
      key={btn}
      className={`
        flex-1 aspect-square m-1 items-center justify-center rounded-full
        ${
          btn === "="
            ? "bg-orange-500"
            : index === 3
            ? "bg-blue-500"
            : "bg-gray-100"
        }
      `}
      onPress={() => {
        if (btn === "=") calculate();
        else if (btn === "⌫") setDisplay((prev) => prev.slice(0, -1) || "0");
        else if ("0123456789.".includes(btn)) handleNumber(btn);
        else handleOperator(btn);
      }}
    >
      <Text
        className={`text-xl ${
          ["=", "×", "-", "+", "÷"].includes(btn) ? "text-white" : "text-black"
        }`}
      >
        {btn}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-end p-4">
        <Text className="text-right text-4xl text-gray-400">{equation}</Text>
        <Text className="text-right text-6xl font-light">{display}</Text>
      </View>

      <View className="p-2">
        <View className="flex-row">
          {["C", "(", ")", "÷"].map((btn, index) => renderButton(btn, index))}
        </View>

        {[
          ["7", "8", "9", "×"],
          ["4", "5", "6", "-"],
          ["1", "2", "3", "+"],
          ["0", ".", "⌫", "="],
        ].map((row, i) => (
          <View key={i} className="flex-row">
            {row.map((btn, j) => renderButton(btn, j))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
