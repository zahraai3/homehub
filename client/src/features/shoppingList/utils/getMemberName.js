export function getMemberName(memberId, members) {

    
    if (!memberId) return null;
    const member = members?.find((m) => m.uid === memberId);
    console.log(member.displayName);
    
    return member?.displayName || null;
}