import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Brain, Dumbbell } from "lucide-react-native";
import { JSX } from "react";
import { TouchableOpacity } from "react-native";

export const statIcons: Record<string, JSX.Element> = {
        strength: (
            <TouchableOpacity>
                <Dumbbell size={32} color="#6366f1" />
            </TouchableOpacity>
        ),
        stamina: (
            <TouchableOpacity>
                <MaterialCommunityIcons name="run" size={32} color="#10b981" />
            </TouchableOpacity>
        ),
        intelligence: (
            <TouchableOpacity >
                <Brain size={32} color="#f59e0b" />
            </TouchableOpacity>
        ),
        karma: (
            <TouchableOpacity >
                <MaterialCommunityIcons name="yin-yang" size={34} color="#ec4899" />
            </TouchableOpacity>
        ),
    };