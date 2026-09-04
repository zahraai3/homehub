export function getMemberName(memberId, members) {
    if (!memberId) return null;
    const member = members?.find((m) => m.id === memberId);
    return member?.name || null;
}