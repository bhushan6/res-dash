import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { createContext } from "react";
import { useMemo } from "react";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const url =
  "https://us-central1-arboreal-vision-339901.cloudfunctions.net/get_filter_values";

const SelectionContext = createContext(null);

const SelectedValuesContext = ({ children }) => {
  const selectedValuesState = useState({});

  return (
    <>
      <SelectionContext.Provider value={selectedValuesState}>
        {children}
      </SelectionContext.Provider>
    </>
  );
};

function useSelection() {
  return useContext(SelectionContext);
}

const MultiSelect = ({ option, values, rawOptionData }) => {
  const [selectedValues, setSelectedValue] = useSelection();

  const processedValues = useMemo(() => {
    const dummy = [];

    const optionData = rawOptionData;
    const selected = selectedValues;

    const selectedKeys = Object.keys(selected);
    if (selectedKeys.length > 0) {
      const filterKey = selectedKeys.filter((k) => k !== option);
      const relatedOptions = optionData.filter((dataPoint) => {
        let shouldadd = false;
        if (filterKey.length > 0) {
          filterKey.forEach((k) => {
            selected[k].forEach((s) => {
              if (s.value === dataPoint[k]) {
                shouldadd = true;
              } else {
                shouldadd = false;
              }
            });
          });
        } else {
          shouldadd = true;
        }

        return shouldadd;
      });

      const filterDup = new Set(relatedOptions.map((o) => o[option]));

      filterDup.forEach((v) => {
        dummy.push({ label: v, value: v });
      });
    } else {
      values.forEach((v) => {
        dummy.push({ label: v, value: v });
      });
    }

    return dummy;
  }, [values, selectedValues, option, rawOptionData]);

  return (
    <Select
      isMulti
      value={selectedValues[option] || []}
      name="filters"
      placeholder={option}
      options={processedValues}
      onChange={(data) => {
        setSelectedValue((state) => {
          let newState = {};
          newState = { ...state, [option]: data };
          if (data.length === 0) {
            delete newState[option];
          }
          return newState;
        });
      }}
    />
  );
};

const DataTable = ({ rawOptionData }) => {
  const [selectedValues] = useSelection();
  const tableHead = rawOptionData ? rawOptionData[0] : {};

  const table = useMemo(() => {
    const selectedKeys = selectedValues ? Object.keys(selectedValues) : [];

    console.log(selectedKeys, selectedValues);

    let dummy = [];

    if (selectedKeys.length > 0) {
      let shouldAdd = false;
      rawOptionData.forEach((data) => {
        selectedKeys.forEach((key) => {
          const values = selectedValues[key].map((v) => v.value);
          if (values.includes(data[key])) {
            shouldAdd = true;
          } else {
            shouldAdd = false;
          }
        });
        shouldAdd && dummy.push(data);
      });
    } else {
      dummy = rawOptionData;
    }

    return dummy;
  }, [selectedValues, rawOptionData]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          {table && tableHead && (
            <>
              <TableHead>
                <TableRow>
                  {Object.keys(tableHead).map((title) => {
                    return (
                      <TableCell key={title} align="right">
                        {title}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((value, i) => {
                  return (
                    <TableRow
                      key={JSON.stringify(value)}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {Object.keys(tableHead).map((title) => {
                        return (
                          <TableCell key={`${value[title]}${i}`} align="right">
                            {value[title]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export const Task = () => {
  const [options, setOptions] = useState({});
  const [rawOptionData, setData] = useState({});

  useEffect(() => {
    const getOptions = async () => {
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
      const dummy = {};
      data.forEach((option) => {
        Object.entries(option).forEach(([key, value]) => {
          if (dummy[key]) {
            dummy[key] = [...dummy[key], value];
          } else {
            dummy[key] = [value];
          }
        });
      });

      setOptions(() => {
        const state = {};
        Object.entries(dummy).forEach(([key, value]) => {
          state[key] = new Set(value);
        });
        return state;
      });
    };

    try {
      getOptions();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <SelectedValuesContext>
        {Object.keys(options).map((optionKey) => {
          return (
            <MultiSelect
              key={optionKey}
              option={optionKey}
              values={options[optionKey]}
              rawOptionData={rawOptionData}
            />
          );
        })}
        <div style={{ display: "flex" }}>
          <DataTable rawOptionData={rawOptionData} />
        </div>
      </SelectedValuesContext>
    </div>
  );
};
