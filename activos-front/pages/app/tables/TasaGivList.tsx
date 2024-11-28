import { Api, Config, ConfigColumns } from "datatables.net-bs5";
import { TableFunc } from "./DataTables";
import { useMemo } from "react";

export type TGiv = {
  giv: number;
  desc: string;
  tras: string;
  st: string;
  gr: string;
  stl: string;
  estado: string;
};

type GivListProps = {
  tablecallback?: (ev: Api) => void;
  aprobClick?: (id:number) => void;
  viewClick?: () => void;
  viewIdClick?: (id: number) => void;
  click?: () => void;
  config?: Config;
  sendClick?: (id: number, controlId: number) => void;
  receiveClick?: (id: number, controlId: number) => void;
  viewIdControlClick?: (id: number, controlId: number) => void;
  trackClick?: (id: number) => void;
  editClick?: (id: number) => void;
  hideView?: boolean;
};
export const TasaGivList = (props: GivListProps) => {
  const columns = useMemo<ConfigColumns[]>(
    () => [
      {
        title: "GIV",
        data: "giv",
        defaultContent: "-",
      },
      {
        title: "Descripción",
        data: "descripcion",
        defaultContent: "-",
      },
      {
        title: "Centro de Origen",
        data: "traslado",
        defaultContent: "-",
      },
      {
        title: "Centro de Destino",
        data: "trasladO_DESTINO",
        defaultContent: "-",
      },
      {
        title: "Emplazamiento de Destino",
        data: "emplazamientO_DESTINO",
        defaultContent: "-",
      },
      {
        title: "ST",
        data: "st",
        defaultContent: "-",
      },
      {
        title: "GR",
        data: "gr",
        defaultContent: "-",
      },
      // {
      //   title: "STL",
      //   data: "stl",
      //   defaultContent: "-",
      // },
      {
        title: "Estado",
        data: "estado",
        defaultContent: "-",
      },
      {
        title: "",
        data: null,
        className: "all",
        width: "10%",
        render: (d, ty) => {
          if (ty !== "display") {
            return d.giv;
          }
          const container = document.createElement("div");
          container.style.minWidth = "max-content";
          container.style.display = "flex";
          container.style.justifyContent = "space-around";
          container.style.gap = "8px";
          /*if(!props.hideView) {
            const btn = document.createElement("button");
            btn.className = "btn btn-link";
            btn.innerHTML = `<i class="fa fa-eye"></i>`;
            btn.onclick = () => {
              props.viewClick?.();
            };

            container.append(btn);
          }*/
          if(props.viewIdClick) {
            const btn = document.createElement("button");
            btn.className = "btn btn-link p-0";
            btn.innerHTML = `<i class="fa fa-eye"></i>`;
            btn.onclick = () => {
              props.viewIdClick?.(d.giv);
            };

            container.append(btn);
          }
          if (props.aprobClick) {
            const btn2 = document.createElement("button");
            btn2.className = "btn btn-link p-0";
            btn2.innerHTML = `<i class="fa fa-user-check"></i>`;
            btn2.onclick = () => {
              props.aprobClick?.(d.giv);
            };
            container.append(btn2);
          }
          if(props.viewIdControlClick) {
            const btn = document.createElement("button");
            btn.className = "btn btn-link p-0";
            btn.innerHTML = `<i class="fa fa-eye"></i>`;
            btn.onclick = () => {
              props.viewIdControlClick?.(d.giv, d.idcontrol);
            };

            container.append(btn);
          }
          if (props.sendClick) {
            const btn3 = document.createElement("button");
            btn3.className = "btn btn-link p-0 btn-entrega";
            btn3.innerHTML = `<i class="fa fa-share"></i>`;
            btn3.title='Entregar'
            btn3.onclick = () => {
              props.sendClick?.(d.giv, d.idcontrol);
            };
            container.append(btn3);
          }
          if (props.receiveClick) {
            const btnrec = document.createElement("button");
            btnrec.className = "btn btn-link p-0 btn-recepcion";
            btnrec.innerHTML = `<i class="fa fa-reply"></i>`;
            btnrec.title='Recibir'
            btnrec.onclick = () => {
              props.receiveClick?.(d.giv, d.idcontrol);
            };
            container.append(btnrec);
          }
          if (props.trackClick) {
            const btn4 = document.createElement("button");
            btn4.className = "btn btn-link p-0";
            btn4.innerHTML = `<i class="fa fa-map-marker"></i>`;
            btn4.onclick = () => {
              props.trackClick?.(d.giv);
            };
            container.append(btn4);
          }
          if (props.editClick) {
            const btn5 = document.createElement("button");
            btn5.className = "btn btn-link p-0";
            btn5.innerHTML = `<i class="fas fa-edit"></i>`;
            btn5.onclick = () => {
              props.editClick?.(d.giv);
            };
            container.append(btn5);
          }
          return container;
        },
      },
    ],
    [props]
  );
  const config = useMemo<Config>(
    () => ({ columns, ...props.config }),
    [props.config]
  );
  return (
    <TableFunc
      config={config}
      ready={props.tablecallback}
      click={props.click}
    />
  );
};
