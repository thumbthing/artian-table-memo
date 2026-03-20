export function normalizeTarredDeviceInput(input: string) {
  const zeroStartRemovedString = input.replace(/^0+/, "");
  const normalizedString = zeroStartRemovedString.replaceAll(/\D/g, "");

  if (normalizedString === "") return 0;

  const isSafeNumber = Number.isSafeInteger(Number(normalizedString));

  if (!isSafeNumber) return 0;

  return Number(normalizedString);
}

export function normalizeFormData(formData: FormData) {
  const attack = formData.get("attack");
  const affinity = formData.get("affinity");
  const element = formData.get("element");

  return {
    attack: (attack !== null) ? normalizeTarredDeviceInput(attack.toString()) : 0,
    affinity: (affinity !== null) ? normalizeTarredDeviceInput(affinity.toString()) : 0,
    element: (element !== null) ? normalizeTarredDeviceInput(element.toString()) : 0
  }
}