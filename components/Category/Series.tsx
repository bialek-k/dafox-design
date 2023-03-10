import Radio from "@mui/material/Radio";
import { yellow, grey } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";

const Series = ({ series }) => {
  return (
    <div className="py-3">
      <p className=" text-left font-bold text-neutral-700 w-full dark:invert">
        {series.name}
      </p>
      <div>
        {series.series.map((name) => (
          <div className="flex" key={name}>
            <FormControlLabel
              className="ml-2 h-8"
              value={name}
              control={
                <Radio
                  size="small"
                  sx={{
                    color: grey[700],
                    "&.Mui-checked": {
                      color: yellow[800],
                    },
                  }}
                />
              }
              label={name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series;
