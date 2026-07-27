export function calculateCollected(participants){
    return participants
        .filter((participant) => participant.paid)
        .reduce((total,participant) => total + participant.share , 0);
}