import Upload from "../../components/Upload";
import Perms from "../../components/Perms";
import DisplayPerms from "../../components/DisplayPerms";
import { useMoralis } from "react-moralis";

export default function UploadPage() {
  const { isWeb3Enabled } = useMoralis();

  return (
    <div>
      <div>
        <Upload />
        {isWeb3Enabled ? (
          <div>
            <Perms />
            <DisplayPerms />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
