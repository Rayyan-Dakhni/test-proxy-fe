import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { Switch } from "@/components/ui/switch";

const ProxyRulesCard = ({ rules, setRules }: { rules: any; setRules: any }) => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(rules);

  const updateRules = async () => {
    setLoading(true);
    const res = await axios.put("/rules", formState);
    setRules(res.data);
    setLoading(false);
  };

  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
      <h2 className='text-xl font-semibold mb-3'>Proxy Rules</h2>

      <div className='flex gap-8 items-center'>
        <div className='w-full'>
          <div className='mb-3 w-full'>
            <label className='block text-sm font-medium mb-1'>
              Whitelisted Endpoints
            </label>
            <Input
              value={formState.whitelistedEndpoints.join(",")}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  whitelistedEndpoints: e.target.value
                    .replace(/\s/g, "")
                    .split(","),
                })
              }
            />

            <p className='text-sm text-gray-600 p-2'>
              use comma separated values to add multiple urls for eg. /url1,
              /url2
            </p>
          </div>

          <div className='mb-3 w-full'>
            <label className='block text-sm font-medium mb-1'>
              Blacklisted Endpoints
            </label>
            <Input
              value={formState.blacklistedEndpoints.join(",")}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  blacklistedEndpoints: e.target.value
                    .replace(/\s/g, "")
                    .split(","),
                })
              }
            />

            <p className='text-sm text-gray-600 p-2'>
              use comma separated values to add multiple urls for eg. /url1,
              /url2
            </p>
          </div>
        </div>

        <div className='w-max'>
          <div className='w-full mb-5 text-center'>
            <Switch
              checked={formState.loggingEnabled}
              onCheckedChange={(val) =>
                setFormState({ ...formState, loggingEnabled: val })
              }
            />

            <h6>Logging Enabled</h6>
          </div>

          <div className='w-full text-center'>
            <Button onClick={updateRules} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyRulesCard;
