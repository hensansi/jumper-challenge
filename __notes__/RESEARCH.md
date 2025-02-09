# Wallet authentication

- [reown](https://docs.reown.com/) (formerly WalletConnect)
- [rainbowkit](https://www.rainbowkit.com/docs/installation)

# Wagmi

After quickly looking into both solutions there looks like there is something that was referenced before, Wagmi.

### What is it?

Wagmi is a React Hooks library for Ethereum. It provides developers with intuitive building blocks to build their Ethereum apps.

### Examples

[Sign-In with Ethereum](https://1.x.wagmi.sh/examples/sign-in-with-ethereum)
[AppKit installation](https://docs.reown.com/appkit/next/core/installation)
[next-wagmi-app-router](https://github.com/reown-com/appkit-web-examples/tree/main/nextjs/next-wagmi-app-router)

#### Notes for later

- wagmi [security notes](https://wagmi.sh/react/installation#security)

```
Ethereum-related projects are often targeted in attacks to steal users' assets. Make sure you follow security best-practices for your project. Some quick things to get started.

    Pin package versions, upgrade mindfully, and inspect lockfile changes to minimize the risk of supply-chain attacks.
    Install the Socket Security GitHub App to help detect and block supply-chain attacks.
    Add a Content Security Policy to defend against external scripts running in your app.
```

- Look into the [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react) to learn about the library, APIs, and more.

### Decision record

While reading the [Wagmi documentation](https://wagmi.sh/react/guides/connect-wallet#third-party-libraries) I decided to use a third-party for the sake of speed and because I'm not familiar with ethereum wallet connection procedures. I picked AppKit because it is connected with WalletConnect, and I was curious to know more about the project.
