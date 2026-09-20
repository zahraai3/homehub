import { useState } from "react";
import {Icon} from '@iconify/react'
import styles from './InviteCodeBox.module.css'

export default function InviteCodeBox({inviteCode}){
    const [copied , setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.error('FAILED TO COPY INVITE CODE' , error);
        }
    }

    return (
        <div className={styles.box}>
            <span className={styles.label}>Invite Code :</span>
            <span className={styles.code}>{inviteCode}</span>
            <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopy}
                aria-label="Copy invite code"
            >
                <Icon icon={copied ? 'bi:check-lg' : 'bi:clipboard'} width={20} />
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    )
}
