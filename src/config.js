import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { sepolia, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '302141b6d027e428df041262be6ec0f5'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [sepolia, mainnet]
const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
  enableWalletConnect: false, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: false, // Optional - true by default
  enableCoinbase: false, // Optional - true by default
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default config