import useMemberData from "../hooks/useMemberData";

const MemberCard = () => {
    const {resultMembers , resultExpenses } = useMemberData()

    if(!resultMembers.isSuccess || !resultExpenses.isSuccess){
        return <p>Loading...</p>
    }
    if(resultMembers.isPending || resultExpenses.isPending){
        return <p>Loading...</p>
    }

    return(
        <div>
            
        </div>
    )

}

