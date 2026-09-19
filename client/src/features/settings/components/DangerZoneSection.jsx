import styles from './DangerZoneSection.module.css';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useAuth } from '../../auth/context/authContext';
import { useHome } from '../../auth/hooks/useHome';
import { useMembers } from '../../members/hooks/useMembers';
import { useLeaveHome } from '../../members/hooks/useLeaveHome';
import { useLeaveHomeAsAdmin } from '../../auth/hooks/useLeaveHomeAsAdmin';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';
import TransferOwnershipDialog from '../../../shared/components/TransferOwnershipDialog';

function DangerZoneSection() {
  const { user } = useAuth()
  const {data:home} = useHome(user?.uid)
  const {data: members} = useMembers(user?.uid)

  const isAdmin = home?.ownerId === user?.uid
  const hasOtherMembers = members?.some((m) => m.uid !== user?.uid)

  const [isLeaveConfirmOpen , setIsLeaveConfirmOpen ] = useState(false)
  const [isTransferDialogOpen , setIsTransferDialogOpen ] = useState(false)

  const {mutate: leaveHome , isPending: isLeavingMember } = useLeaveHome()
  const {mutate: leaveHomeAsAdmin , isPending: isLeavingAdmin} = useLeaveHomeAsAdmin()

  const handleLeaveClick = () => {
    if(isAdmin){
      setIsTransferDialogOpen(true)
    }else{
      setIsLeaveConfirmOpen(true)
    }
  }

  const handleMemberLeaveConfirm = () => {
    leaveHome(user?.uid)
  }

  const handleTransferConfirm = (newOwnerId) => {
    leaveHomeAsAdmin({
      homeId: home.id,
      newOwnerId,
      currentAdminId:user?.uid,
    })
  }

  return (
    <section>
      <h2 className={styles.heading}>
        <Icon icon='at-icons:danger' width='24'/>
          Danger Zone</h2>

      {isAdmin && !hasOtherMembers ? (
        <p className={styles.soloAdminNote}>
          You're the only member.
        </p>
      ) : (
        <button className={styles.leave} onClick={handleLeaveClick}>
          Leave Home
        </button>
      )}


      <ConfirmDialog
        isOpen={isLeaveConfirmOpen}
        title="Leave this home?"
        message="You'll lose access to this home. This action cannot be undone."
        confirmText="Leave"
        onConfirm={handleMemberLeaveConfirm}
        onCancel={() => setIsLeaveConfirmOpen(false)}
        isConfirming={isLeavingMember}
      />

      <TransferOwnershipDialog
        isOpen={isTransferDialogOpen}
        members={members || []}
        currentUserId={user?.uid}
        onConfirm={handleTransferConfirm}
        onCancel={() => setIsTransferDialogOpen(false)}
        isConfirming={isLeavingAdmin}
      />
    </section>
  )

}

export default DangerZoneSection;