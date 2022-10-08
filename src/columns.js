export const editableTableColumns = [
  {
    title: "אותיות הרשימה",
    dataIndex: "letters",
    key: "letters",
    minWidth: 80,
  },
  {
    title: "מספר הקולות",
    dataIndex: "amount",
    key: "amount",
    minWidth: 100,
    editable: true,
  },
  {
    title: "עודפים",
    dataIndex: "odafim",
    key: "odafim",
    minWidth: 120,
    editable: true,
  },
];

export const columns = [
  {
    title: "אותיות הרשימה",
    dataIndex: "letters",
    key: "letters",
    fixed: "left",
  },
  {
    title: "שם הרשימה",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "אחוז",
    dataIndex: "totalPercent",
    key: "totalPercent",
    render: (record) => `${(100 * record).toFixed(2)}%`,
  },
  {
    title: "מספר הקולות",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "עודפים",
    dataIndex: "odafim",
    key: "odafim",
  },

  {
    title: "ללא הסכם עודפים",
    // dataIndex: "totalWithOut",
    key: "totalWithOut",
    render: (record) => {
      let color;
      if (record.total !== record.totalWithOut) {
        color =
          record.total > record.totalWithOut ? "mediumspringgreen" : "red";
      }
      return (
        <span style={{ backgroundColor: color }}>{record.totalWithOut}</span>
      );
    },
  },
  {
    title: "לפני בדר עופר",
    // dataIndex: "totalWithOut",
    key: "beforeBadderOfer",
    render: (record) => {
      let color;
      if (record.total !== record.beforeBadderOfer) {
        color =
          record.total > record.beforeBadderOfer ? "mediumspringgreen" : "red";
      }
      return (
        <span style={{ backgroundColor: color }}>
          {record.beforeBadderOfer}
        </span>
      );
    },
  },
  {
    title: "מנדטים",
    dataIndex: "total",
    key: "total",
    fixed: "right",
  },
];
