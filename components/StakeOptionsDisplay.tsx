import { VStack, Text, Button } from "@chakra-ui/react"
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from "@solana/spl-token"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useCallback, useEffect, useState } from "react"
import { createInitializeStakeAccountInstruction, createRedeemInstruction, createStakingInstruction, createUnstakeInstruction } from "../utils/instructions"
import { PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata"
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js"
import { PROGRAM_ID, STAKE_MINT } from "../utils/constants"
import { getStakeAccount } from "../utils/accounts"

export const StakeOptionsDisplay = ({ 
    nftData,
    isStaked, 
    daysStaked,
    totalEarned,
    claimable,
}: { 
    nftData: any
    isStaked: boolean
    daysStaked: number
    totalEarned: number
    claimable: number
}) => {

    const walletAdapter = useWallet()
    const { connection } = useConnection()

    const [isStaking, setIsStaking] = useState(isStaked)
    const [nftTokenAccount, setNftTokenAccount] = useState<PublicKey>()

    const checkStakingStatus = useCallback(async () => {
        if (!walletAdapter.publicKey || !nftTokenAccount) {
            return
        }

        try {
            const account = await getStakeAccount(
                connection, 
                walletAdapter.publicKey, 
                nftTokenAccount
            )

            console.log("stake account:", account)

            setIsStaking(account.state === 0)
        } catch (e) {
            console.log("error:", e)
        }
    }, [walletAdapter, connection, nftTokenAccount])

    
    
    
    
    
    
    

    useEffect(() => {
        checkStakingStatus()

        if (nftData) {
            connection
                .getTokenLargestAccounts(nftData.mint.address)
                .then((accounts) => setNftTokenAccount(accounts.value[0].address))
        }
    }, [nftData, walletAdapter, connection, checkStakingStatus])

    const sendAndConfirmTransaction = useCallback(
        async (transaction: Transaction) => {
            try {
                const signature = await walletAdapter.sendTransaction(
                    transaction, 
                    connection
                )
                const latestBlockhash = await connection.getLatestBlockhash()
                await connection.confirmTransaction(
                    {
                        blockhash: latestBlockhash.blockhash,
                        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
                        signature: signature
                    },
                    "finalized"
                )
            } catch (error) {
                console.log(error)
            }

            await checkStakingStatus()
        },
        [walletAdapter, connection, checkStakingStatus]
     )

    const handleStake = useCallback(async () => {
        if (
            !walletAdapter.connected ||
            !walletAdapter.publicKey ||
            !nftTokenAccount
        ) {
            alert("Please connect your wallet")
            return
        }

        const [stakeAccount] = PublicKey.findProgramAddressSync(
            [walletAdapter.publicKey.toBuffer(), nftTokenAccount.toBuffer()],
            PROGRAM_ID
        )

        const transaction = new Transaction()

        const account = await connection.getAccountInfo(stakeAccount)
        if(!account) {
            transaction.add(
                createInitializeStakeAccountInstruction(
                    walletAdapter.publicKey,
                    nftTokenAccount,
                    PROGRAM_ID
                )
            )
        }

        const stakeInstruction = createStakingInstruction (
            walletAdapter.publicKey,
            nftTokenAccount,
            nftData.mint.address as PublicKey,
            nftData.edition.address as PublicKey,
            TOKEN_PROGRAM_ID,
            METADATA_PROGRAM_ID,
            PROGRAM_ID
        )

        transaction.add(stakeInstruction)

        await sendAndConfirmTransaction(transaction)
    }, [walletAdapter, 
        connection, 
        nftData, 
        nftTokenAccount, 
        sendAndConfirmTransaction])

    const handleUnstake = useCallback(async () => {
        if (
            !walletAdapter.connected ||
            !walletAdapter.publicKey ||
            !nftTokenAccount
        ) {
            alert("Please connect your wallet")
            return
        }

        const userStakeATA = await getAssociatedTokenAddress(
            STAKE_MINT,
            walletAdapter.publicKey
        )

        const account = await connection.getAccountInfo(userStakeATA)

        const transaction = new Transaction()

        if (!account) {
            transaction.add(
                createAssociatedTokenAccountInstruction(
                    walletAdapter.publicKey,
                    userStakeATA,
                    walletAdapter.publicKey,
                    STAKE_MINT
                )
            )
        }

        transaction.add(
            createUnstakeInstruction(
                walletAdapter.publicKey,
                nftTokenAccount,
                nftData.address,
                nftData.edition.address,
                STAKE_MINT,
                userStakeATA,
                TOKEN_PROGRAM_ID,
                METADATA_PROGRAM_ID,
                PROGRAM_ID
            )
        )

        await sendAndConfirmTransaction(transaction)
    }, [walletAdapter, connection, nftData, nftTokenAccount, sendAndConfirmTransaction])

    const handleClaim = useCallback(async () => {
        if (
            !walletAdapter.connected ||
            !walletAdapter.publicKey ||
            !nftTokenAccount
        ) {
            alert("Please connect your wallet")
            return
        }

        const userStakeATA = await getAssociatedTokenAddress(
            STAKE_MINT,
            walletAdapter.publicKey
        )

        const account = await connection.getAccountInfo(userStakeATA)

        const transaction = new Transaction()

        if (!account) {
            transaction.add(
                createAssociatedTokenAccountInstruction(
                    walletAdapter.publicKey,
                    userStakeATA,
                    walletAdapter.publicKey,
                    STAKE_MINT
                )
            )
        }

        transaction.add(
            createRedeemInstruction(
                walletAdapter.publicKey,
                nftTokenAccount,
                nftData.mint.address,
                userStakeATA,
                TOKEN_PROGRAM_ID,
                PROGRAM_ID
            )
        )

        await sendAndConfirmTransaction(transaction)

    }, [walletAdapter, connection, nftData.mint.address, nftTokenAccount, sendAndConfirmTransaction])

    return (
        <VStack 
            bgColor="containerBg"
            borderRadius="20px"
            padding="20px 40px"
            spacing={5}
        >
            <Text 
                bgColor="containerBgSecondary" 
                padding="4px 8px" 
                borderRadius="20px" 
                color="bodyText" 
                as="b" 
                fontSize="sm"
            >
                {isStaking 
                ? `STAKING ${daysStaked} DAY${daysStaked === 1 ? "" : "S"}`
                : "READY TO STAKE"}
            </Text>
            <VStack spacing={-1}>
                <Text color="white" as="b" fontSize="4xl">
                    {isStaking ? `${totalEarned} $CPt` : "0 $CPt"}
                </Text>
                <Text color="bodyText">
                    {isStaking ? `${claimable} $CPt earned` : "earn $CPt by staking"}
                </Text>
            </VStack>
            <Button 
                onClick={isStaking ? handleClaim : handleStake}
                bgColor="buttonGreen"
                width="200px" 
            >
                <Text as="b">{isStaking ? "claim $CPt" : "stake Nomad"}</Text>
            </Button>
            {isStaking ? <Button onClick={handleUnstake}>unstake</Button> : null}
        </VStack>
    )
}