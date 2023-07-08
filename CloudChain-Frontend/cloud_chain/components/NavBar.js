import { ConnectButton } from "web3uikit";
import Link from "next/link";
import Image from "next/image";
import Upload from "./Upload";

export default function NavBar() {
  return (
    <div>
      <div className="p-5 border-b-2 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center font-mainFont">
          <Image
            src="/CloudChain.png"
            alt="CloudChain"
            width={70}
            height={70}
          />
          <h1 className="font-bold text-3xl ml-10">ChainCloud</h1>
        </div>
        <div className="flex flex-row items-center">
          <Link legacyBehavior href="/HomePage">
            <a className="mr-4 p-6">Home</a>
          </Link>
          <Link legacyBehavior href="/UploadPage">
            <a className="mr-4 p-6">Upload</a>
          </Link>
          <Link legacyBehavior href="/DisplayPage">
            <a className="mr-4 p-6">Display</a>
          </Link>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
