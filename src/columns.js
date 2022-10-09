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
    render: (value) => value.toLocaleString(),
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
    render: (value) => value.toLocaleString(),
  },
  {
    title: "עודפים",
    dataIndex: "odafim",
    key: "odafim",
  },

  {
    title: "ללא הסכם עודפים",
    dataIndex: "totalWithOut",
    key: "totalWithOut",
    onCell: (record) => {
      let color;
      if (record.total !== record.totalWithOut) {
        color =
          record.total > record.totalWithOut ? "mediumspringgreen" : "tomato";
      }
      return { style: { background: color } };
    },
  },
  {
    title: "לפני בדר עופר",
    key: "beforeBadderOfer",
    dataIndex: "beforeBadderOfer",
    onCell: (record) => {
      let color;
      if (record.total !== record.beforeBadderOfer) {
        color =
          record.total > record.beforeBadderOfer
            ? "mediumspringgreen"
            : "tomato";
      }
      return { style: { background: color } };
    },
  },
  {
    title: "מנדטים",
    dataIndex: "total",
    key: "total",
    fixed: "right",
  },
];
