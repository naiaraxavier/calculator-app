import "../global.css";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [flashingButton, setFlashingButton] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    if (calculated) {
      setDisplay(num);
      setEquation("");
      setCalculated(false);
    } else {
      setDisplay((prev) => (prev === "0" ? num : prev + num));
    }
  };

  const handleOperator = (operator: string) => {
    if (calculated) {
      setEquation(display + operator);
      setCalculated(false);
    } else {
      if (["+", "-", "*", "/"].includes(equation.slice(-1))) {
        setEquation((prev) => prev.slice(0, -1) + operator);
      } else {
        setEquation((prev) => prev + display + operator);
      }
    }
    setDisplay("0");
  };

  const calculate = () => {
    try {
      const sanitizedEquation = equation + display;
      const result = eval(sanitizedEquation);
      setDisplay(result.toString());
      setCalculated(true);
    } catch (error) {
      setDisplay("Error");
    } finally {
      setEquation("");
    }
  };

  const handlePercentage = () => {
    try {
      const currentValue = parseFloat(display);
      if (!isNaN(currentValue) && equation) {
        const lastNumber = parseFloat(
          equation.match(/(\d+)(?!.*\d)/)?.[0] || "0"
        );
        const percentValue = (lastNumber * currentValue) / 100;
        setDisplay(percentValue.toString());
      } else {
        setDisplay((currentValue / 100).toString());
      }
    } catch {
      setDisplay("Error");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
    setCalculated(false);
  };

  const handleButtonClick = (btn: string) => {
    setFlashingButton(btn);

    setTimeout(() => {
      setFlashingButton(null);
    }, 300);

    if (btn === "=") calculate();
    else if (btn === "⌫") setDisplay((prev) => prev.slice(0, -1) || "0");
    else if (btn === "%") handlePercentage();
    else if ("0123456789.".includes(btn)) handleNumber(btn);
    else handleOperator(btn === "×" ? "*" : btn === "÷" ? "/" : btn);
  };

  const renderButton = (btn: string, index: number) => (
    <TouchableOpacity
      key={btn}
      className={`
        flex-1 aspect-square m-1 items-center justify-center
        ${btn === flashingButton ? "animate-flash" : ""}
        ${
          btn === "="
            ? "bg-orange-500"
            : index === 3
            ? "bg-blue-500"
            : "bg-gray-100"
        }
      `}
      onPress={() => handleButtonClick(btn)}
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
    <SafeAreaView className="flex-1 bg-slate-300">
      <View className="flex-1 justify-end p-4">
        <Text className="text-right text-4xl text-gray-400">{equation}</Text>
        <Text className="text-right text-6xl font-light">{display}</Text>
      </View>

      <View className="p-2">
        <View className="flex-row">
          {["%", "(", ")", "÷"].map((btn, index) => renderButton(btn, index))}
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
