import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaMoneyBillWave } from "react-icons/fa";
import { Tree, TreeNode } from "react-organizational-chart";

interface Dependency {
  id: number;
  nombre: string;
  codigo: string;
  dependencyId?: number; // Parent
  centroCosto: boolean;
}

interface TreeProps {
  dependencies: Dependency[];
  entity: any;
}

interface NodeProps {
  dependency: Dependency;
}

const DependencyNode: React.FC<NodeProps> = ({ dependency }) => {
  return (
    <Card className="mb-0 d-inline-block position-relative">
      {!!dependency.centroCosto && (
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Centro de Costo</Tooltip>}
        >
          <div
            className="position-absolute text-success"
            style={{ right: "-10px", top: "-10px" }}
          >
            <FaMoneyBillWave size="20px" />
          </div>
        </OverlayTrigger>
      )}
      <Card.Body className="pb-2 pt-2">
        <Card.Title>{dependency.nombre}</Card.Title>
        <Card.Subtitle className="text-muted m-0 p-0">
          {dependency.codigo}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

const DependencyTree: React.FC<TreeProps> = ({ dependencies, entity }) => {
  const getChildren = (id: number | null) => {
    const children = dependencies.filter((d) => d.dependencyId === id);

    if (!children.length) {
      return null;
    }

    return (
      <>
        {children.map((child) => (
          <TreeNode
            label={<DependencyNode dependency={child} />}
            key={child.id}
          >
            {getChildren(child.id)}
          </TreeNode>
        ))}
      </>
    );
  };

  return (
    <div style={{ overflowX: "auto" }} className="p-2">
      <Tree
        label={
          <Card className="mb-0 d-inline-block position-relative">
            <Card.Body className="pb-2 pt-2">
              <Card.Title>{entity?.razonSocial}</Card.Title>
            </Card.Body>
          </Card>
        }
      >
        {getChildren(null)}
      </Tree>
    </div>
  );
};

export default DependencyTree;
