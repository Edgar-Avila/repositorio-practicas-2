import { Api, Config, ConfigColumns } from "datatables.net-bs5";
import { TableFunc } from "./DataTables";
import { useCallback, useMemo, useRef } from "react";

export type TActivo = {
  id: number;
  centro: string;
  placa: string;
  codigoaf: number;
  desc: string;
  marca: string;
  serie: string;
  estado: string;
};


function clickBtn() {}

type TasaActivoProps = {
  overridecfg: Config;
  click?: () => void;
  clickView?: () => void;
  ready?: (dt: Api) => void;
};
export const TasaActivoTable = (props: TasaActivoProps) => {
  return (
    <TableFunc config={props.overridecfg} ready={props.ready} />
  );
};
