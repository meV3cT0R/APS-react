import { faDumpster, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { TableObjectType } from "./types";
import { TableProps } from "./TableProps";
import Swal from "sweetalert2";
import axios from "axios";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { imageURL, noImage } from "../../utility/constants";


function Td({
  children,
  className,
}: {
  children: ReactElement[] | ReactElement;
  className?: string;
}) {
  return (
    <td
      className={`border-b border-[#eee] py-5 px-4 pl-9  xl:pl-11 ${className}`}
    >
      {children}
    </td>
  );
}

export default function Table({
  columns,
  datas,
  operations = true,
  avoidColumns,
  editPath,
  deleteURL,
  afterDeletePath,
  XCORSToken,
  editButton = true,
  delErrorMessage
}: TableProps) {
  const navigate = useNavigate();
  const { token } = useGlobalContext();
  let newColumns = columns;
  if (operations) {
    newColumns = [...newColumns, "operations"];
  }

  return (
    <div className="rounded-sm border border-stroke bg-white  pb-2.5 shadow-default xl:pb-1 shadow-lg ">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="shadow-sm ">
            <tr className="bg-slate-100 text-left ">
              {newColumns.map((column, i) => {
                return (
                  <th
                    key={column + i}
                    className="capitalize whitespace-nowrap py-8 px-4 font-extrabold text-black  xl:pl-11"
                  >
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {(datas &&
              datas.map((data, i) => (
                <tr key={i + JSON.stringify(data) + "table_row"}>
                  {Object.keys(data).map((key, i) => {
                    let stringStyle = "";
                    if (typeof data[key] == "string") {
                      if ((data[key] as string).length >= 50) {
                        stringStyle = "min-w-[40ch] max-w-[50ch]";
                      }
                    }
                    if (avoidColumns && avoidColumns.includes(key)) return;
                    if (
                      typeof data[key] == "object" &&
                      data[key].type == TableObjectType.LINK
                    ) {
                      return (
                        <Td key={JSON.stringify(data[key])} className="whitespace-nowrap  ">
                          <a
                            href={data[key].url}
                            className="text-blue-500 hover:text-blue-700 space-x-3"
                            target="_blank"
                          >
                            {data[key].icon && <FontAwesomeIcon icon={data[key].icon} />}
                            <span>{data[key].text}</span>
                          </a>
                        </Td>
                      )
                    }
                    if (
                      typeof data[key] == "object" &&
                      data[key].type == TableObjectType.ARRAY
                    ) {
                      return (
                        <Td key={JSON.stringify(data[key])}>
                          <ul className={data[key]?.className}>
                            {data[key].values.map((dat: any) => {
                              if (
                                typeof dat == "object" &&
                                dat.type == TableObjectType.IMAGE
                              ) {
                                return (
                                  <li
                                    key={JSON.stringify(dat)}
                                  >
                                    {(dat.url && (
                                      <img
                                        src={dat.url}
                                        className={`min-w-[100px] min-h-[65px] ${dat.className}`}
                                      />
                                    )) || (
                                        <img
                                          src={"https://images.wondershare.com/repairit/aticle/2021/07/resolve-images-not-showing-problem-1.jpg"}
                                          className="min-w-[100px] w-[100px] min-h-[65px] h-[65px] "
                                        />
                                      )}
                                  </li>
                                );
                              } else if (
                                typeof dat == "object" &&
                                dat.type == TableObjectType.LINK
                              ) {
                                return (
                                  <li key={JSON.stringify(dat)} className="whitespace-nowrap">
                                    <a
                                      href={dat.url}
                                      className="text-blue-500 hover:text-blue-700 space-x-3"
                                      target="_blank"
                                    >
                                      {dat.icon && <FontAwesomeIcon icon={dat.icon} />}
                                      <span>{dat.text}</span>
                                    </a>
                                  </li>
                                )
                              }
                              return (
                                <li
                                  key={JSON.stringify(dat)}
                                  className={dat.className}
                                >
                                  {dat}
                                </li>
                              );
                            })}
                          </ul>
                        </Td>
                      );
                    }
                    if (
                      typeof data[key] == "object" &&
                      data[key].type == TableObjectType.IMAGE
                    ) {
                      return (
                        <Td key={JSON.stringify(data[key]) + i + i}>
                          {(data[key].url && (
                            <img
                              src={data[key].url.startsWith("http") && data[key].url || imageURL + data[key].url}
                              className="min-w-[100px] w-[100px] min-h-[65px] h-[65px] "
                            />
                          )) || (
                              <img
                                src={noImage}
                                className="min-w-[100px] w-[100px] min-h-[65px] h-[65px] "
                              />
                            )}
                        </Td>
                      );
                    } else if (typeof data[key] == "object") {
                      return (
                        <Td key={JSON.stringify(data[key]) + i + i}>
                          <ul>
                            {Object.keys(data[key]).map((dat, i) => {
                              return (
                                <li
                                  key={JSON.stringify(dat) + i}
                                  className="whitespace-nowrap"
                                >
                                  {" "}
                                  {data[key][dat]}{" "}
                                </li>
                              );
                            })}
                          </ul>
                        </Td>
                      );
                    }
                    return (
                      <Td
                        key={JSON.stringify(data[key]) + i + i}
                        className={`${stringStyle}`}
                      >
                        {" "}
                        {data[key]}
                      </Td>
                    );
                  })}

                  {operations && (
                    <td className="border-b border-[#eee] py-5 px-4  ">
                      <div className="flex items-center space-x-3.5 justify-start">
                        {editButton && <button
                          className="text-green-500 text-3xl"
                          onClick={() => {
                            navigate((editPath ? editPath : `edit/`) + data["id"]);

                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>}
                        <button
                          className=" text-red-500 text-3xl "
                          onClick={() => {
                            const func = async () => {
                              await Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              })
                                .then(async (result) => {
                                  if (result.isConfirmed && token) {
                                    await axios
                                      .delete(`${deleteURL}/${data["id"]}`, {
                                        headers: {
                                          Authorization: "Bearer " + token,
                                        },
                                      })
                                      .then((_) => {
                                        navigate(`${afterDeletePath ? afterDeletePath : ""}`);
                                      })
                                      .catch((_) => Swal.fire({
                                        title: "Something Went Wrong",
                                        icon: "error",
                                        text: delErrorMessage || err
                                      }));
                                  }
                                })
                                .catch((err) => console.log(err));
                            };
                            func();
                          }}
                        >
                          <FontAwesomeIcon icon={faDumpster} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))) || <div> Loading...</div>}
          </tbody>
        </table>
      </div>
    </div>
  );
}