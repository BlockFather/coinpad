
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import WalletContextProvider from "../components/WalletContextProvider"

const colors = {
  background: "1F1F1F",
  accent: "#833BBE",
  bodyText: "rgba(255, 255, 255, 0.75)",
  secondaryPurple: "#CB8CFF",
  containerBg: "rgba(255, 255, 255, 0.4)",
  containerBgSecondary: "7EFFA7",
  buttonGreen: "rgb(255,255,0.75)"
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <ChakraProvider theme={theme}>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ChakraProvider>
  )
    
}

export default MyApp
