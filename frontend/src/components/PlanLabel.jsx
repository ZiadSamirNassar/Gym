const PlanLabel = ({ variant }) => {
    if (variant == "gold") { 
        return <span className="gold-plan">GOLD PLAN</span>
    } else { 
        return <span className="other-plan">{ localStorage.getItem("membershipPLanName") } PLAN</span>;

    }
}

export default PlanLabel