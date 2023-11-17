import '../styles/globals.css'
import { Provider } from '../context/context'
import '@rainbow-me/rainbowkit/styles.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'

import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const telosTestnet = {
  id: 41, // Chain ID for Telos testnet
  name: "Telos Testnet",
  network: "Telos Testnet",
  rpcUrls: {
    default: {
      http: ["https://testnet.telos.net/evm"],
    },
  },
};

const { chains, provider } = configureChains(
  [telosTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'BlockLand',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  )
}

export default MyApp
