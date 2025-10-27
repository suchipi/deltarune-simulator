import {
  useType,
  useNewComponent,
  Audio,
  Keyboard,
  useUpdate,
  useEnableDisable,
} from "@hex-engine/2d";

import smundertale from "./sfx/smundertale.ogg";

export default function DramaticSound() {
  useType(DramaticSound);

  const audioComponents = Array(15)
    .fill(undefined)
    .map(() => useNewComponent(() => Audio({ url: smundertale })));

  function playOne() {
    const first = audioComponents.shift();
    try {
      first!.play();
    } catch (err) {
      // don't care
    }
    audioComponents.push(first!);
  }

  // Havlark: "You should make it play this sound whenever you press a key"
  const keyboard = useNewComponent(() => Keyboard());
  let lastPressed = false;
  useUpdate((delta) => {
    if (!lastPressed && keyboard.pressed.has("u")) {
      playOne();
    }
    lastPressed = keyboard.pressed.has("u");
  });

  // Havlark: "You should make it play that sound whenever you go back to the game"
  const { onEnabled, onDisabled } = useEnableDisable();
  const onFocus = () => {
    playOne();
  };
  onEnabled(() => {
    window.addEventListener("focus", onFocus);
  });
  onDisabled(() => {
    window.removeEventListener("focus", onFocus);
  });
}
