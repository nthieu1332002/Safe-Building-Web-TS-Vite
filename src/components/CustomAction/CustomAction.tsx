import React from "react";
import { Button, Dropdown, Popconfirm } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineNotification } from "react-icons/ai";
const CustomAction = ({
  type,
  onConfirm,
  onClickSave,
  editable,
  disabled,
  onClickEdit,
  onClickDelete,
  onClickDetail,
  onClickNoti
}) => {
  let items = [];
  switch (type) {
    case "resident":
      items = [
        {
          label: <div onClick={onClickDetail}>Detail</div>,
          key: "0",
          icon: <AiOutlineEye />,
        },
        {
          label: <div onClick={onClickEdit}>Edit</div>,
          key: "1",
          icon: <AiOutlineEdit />,
        },
        {
          label: <div onClick={onClickNoti}>Noti</div>,
          key: "2",
          icon: <AiOutlineNotification />,
        },
        {
          type: "divider",
        },
        {
          label: (
            <div className="delete" onClick={onClickDelete}>
              Delete
            </div>
          ),
          key: "3",
          icon: <AiOutlineDelete className="delete" />,
        },
      ];
      break;
    case "bill":
      items = [
        {
          label: <div onClick={onClickDetail}>Detail</div>,
          key: "0",
          icon: <AiOutlineEye />,
        }
      ];
      break;
    default:
      items = [
        {
          label: <div onClick={onClickEdit}>Edit</div>,
          key: "0",
          icon: <AiOutlineEdit />,
        },
        {
          type: "divider",
        },
        {
          label: (
            <div className="delete" onClick={onClickDelete}>
              Delete
            </div>
          ),
          key: "1",
          icon: <AiOutlineDelete className="delete" />,
        },
      ];
  }

  return editable ? (
    <span>
      <Popconfirm title="Sure to cancel?" onConfirm={onConfirm}>
        <Button type="text">Cancel</Button>
      </Popconfirm>
      <Button
        type="primary"
        ghost
        onClick={onClickSave}
        style={{
          marginLeft: 8,
        }}
      >
        Save
      </Button>
    </span>
  ) : (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
      disabled={disabled}
    >
      <BsThreeDots onClick={(e) => e.preventDefault()} />
    </Dropdown>
  );
};

export default CustomAction;
