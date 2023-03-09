import { createLab } from "@/labs/contracts";
import * as BIM from "./building-information-modeling"

export const Route = "xde-app";
export const Caption = "XDE App";

export const Lab = createLab({
    Route,
    Caption
})

export const Labs = [
    BIM
];

export const ToDos = () => (
    <ul>
        <li>Идея "всё в мобильном" (начать с конкуренции за RocksDB между React Native/.NET и может Flutter)</li>
        <li>Инструменты self-engineering</li>
        <li>Инструменты team-engineering</li>
        <li>
            Обилие различных интерфейсом к внутренним моделям и процессам. От привычных GUI до CLI, TUI, голосовые,
            чатботы, AR/VR и т.д.
        </li>
    </ul>
);

export default Lab;