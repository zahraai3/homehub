export default function getPaidMembers(paerticipants, members){
    return paerticipants
        .filter( (participant) => participant.paid )
        .map( (paerticipant) => {
            const member = members.find(
                (member) => member.uid === paerticipant.memberId
            );

            return member?.displayName;
        });
}