import './App.css';
import Nav from "./components/nav.jsx";
import Footer from "./components/footer.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/home.jsx";
import NA from "./pages/NA";
import Lore from "./pages/about.jsx";
import { ThemeProvider, createTheme } from '@mui/material';

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme
} from '@rainbow-me/rainbowkit';

import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

// fantom chain
const fantomChain = {
  id      : 250,
  name    : 'Fantom',
  network : 'fantom',

  nativeCurrency : {
    name     : 'Fantom',
    symbol   : 'FTM',
    decimals : 18,
  },
  rpcUrls : {
    default : 'https://rpc.ankr.com/fantom/',
  },
  blockExplorers : {
    default : {
      url  : 'https://ftmscan.com/',
      name : 'FTMScan',
    },
  },
  testnet : false,
}

//create provider
const { chains, provider } = configureChains(
  [
    fantomChain
  ],
  [
    publicProvider(),
  ]
);

//connectors
const { connectors } = getDefaultWallets({
  chains,
  appName: 'sacrifice'
});

//create client
const wagmiClient = createClient({
  provider,
  connectors,
  autoConnect: true,
});

const theme = createTheme({
  typography: {
    fontFamily: [
      'DotGothic16',
      'arial',
      'helvetica',
      'sans-serif'
    ].join(','),
  },
})

function App() {
 
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider 
          chains={chains}
          theme={midnightTheme({
            accentColor: "white",
            accentColorForeground: "black",
            borderRadius: "none",
          })}
          modalSize="compact"
        >
          <Router>
            <Nav />
            <Routes>
              <Route exact path="/" element ={<Home/>} />
              <Route exact path="/about" element ={<Lore/>} />
        
              <Route exact path="*" element ={<NA/>} />
            </Routes>
            <Footer/>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
export default App;
