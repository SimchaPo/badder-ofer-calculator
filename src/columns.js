export const columns = [
  {
    title: "שם הרשימה",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "אותיות הרשימה",
    dataIndex: "letters",
    key: "letters",
  },
  {
    title: "אחוז",
    dataIndex: "percent",
    key: "percent",
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
    title: "מנדטים",
    dataIndex: "total",
    key: "total",
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
];
