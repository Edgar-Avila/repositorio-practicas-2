import { useEffect, useRef, useState } from "react";
import DataTable, { Api, Config, ConfigColumns } from "datatables.net-bs5";
import LangEs from "datatables.net-plugins/i18n/es-ES.json";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";

export const TableFunc = (props: {
  config: Config;
  ready?: (dt: Api) => void;
  click?: () => void;
}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [api, setApi] = useState<Api>();
  const { config } = props;
  useEffect(() => {
    //CLIENT SIDE RELOAD USAR PARA SERVICIOS SIMPLES CONTRARIO USAR AJAX,
    api?.clear();
    api?.rows.add([...(config.data ?? [])]).draw();
  }, [config.data]);
  useEffect(() => {
    console.log("INIT");
    const table = new DataTable(tableRef.current!, {
      responsive: true,
      language: LangEs,
      processing: true,
      ...props.config,
    });
    setApi(table);
    table.ready(() => {
     setTimeout(()=>{
       table.responsive?.recalc();
     },300)

      props.ready?.(table);
    });
    table.on("click", () => {
      props.click?.();
    });
    return () => {
      console.log("DESTROY");
      table.off("click");
      table.destroy();
      setTimeout(() => {}, 0);
    };
  }, []);
  return (
    <div className="container-fluid">
      <table
        className="table table-sm table-striped"
        ref={tableRef}
      ></table>
    </div>
  );
};
