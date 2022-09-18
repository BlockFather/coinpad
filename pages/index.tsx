import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Center, Spacer, Stack } from '@chakra-ui/react'
import NavBar from '../components/NavBar'
import Disconnected from '../components/Disconnected'
import Connected from '../components/Connected'
import { useWallet } from '@solana/wallet-adapter-react'


const Home: NextPage = () => {

  const { connected } = useWallet()

  return (
    <div className={styles.container}>
      <Head>
        <title>Nomad</title>
        <meta name="The NFT Collection for Coinpad" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Box 
        w='full' 
        h='calc(130vh)' 
        bgImage={ connected ? "" : "url(/693-svg.svg)" }
        backgroundPosition="center"
        bgRepeat="No-repeat"
        backgroundSize='240px'
        backgroundColor={ 'black' } >

          <Stack w='full' h='calc(100vh)' justify='top'>
            <NavBar />

            <Center>{ connected ? <Connected /> : <Disconnected />} </Center>

            <Center>
              <Box marginBottom={4} color="white">
              {/*<a 
                  href="https//twitter.com/_buildspace"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Built by @BlockFather
                </a>*/}
              </Box>
            </Center>
          </Stack>
      </Box>
    </div>
  )
}

export default Home
