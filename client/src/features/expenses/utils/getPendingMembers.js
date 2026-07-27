export default function getPendingMembers(participants , members){
    return participants
        .filter((participant) => !participant.paid)
        .map((participant) => {
            const member = members.find(
                (member) => member.uid === participant.memberId
            )

            return member?.displayName;
        });
}