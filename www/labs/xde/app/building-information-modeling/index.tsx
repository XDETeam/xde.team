import { createLab } from "@/labs/contracts";

export const Route = "build-information-modeling";
export const Caption = "BIM";

export const ToDos = () => (
    <ul>
        <li>
            К идеям информатики, как строительство трансФОРМировалось в Building inFORMation modeling.
        </li>
        <li>
            В рамках развития мобильной версии XDE App &ndash; сканирование помещения камерой, WiFi/BT
            (может для них понадобятся небольшие устройства вроде nRF/ESP32).
        </li>
    </ul>
)

export const Props = {
    Route,
    Caption
}

export const Lab = createLab(Props, {});

export default Lab;