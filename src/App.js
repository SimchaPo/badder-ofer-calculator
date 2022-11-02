import "./App.css";
import "antd/dist/antd.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  ConfigProvider,
  Typography,
  Row,
  Col,
  Spin,
  Radio,
  Button,
  Card,
  Space,
} from "antd";
import { columns } from "./columns";
import { calculate } from "./calculate";
import EditableTable from "./EditableTable";
import Explanation from "./Explanation";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { config } from "./Constants";

const { Title } = Typography;
const { Grid } = Card;

function App() {
  const [results, setResults] = useState([]);
  const [editTable, setEditTable] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState([]);
  const [originCalculatedResults, setOriginCalculatedResults] = useState([]);
  const [radioValue, setRadioValue] = useState(25);
  const [changeOrigin, setChangeOrigin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    switch (radioValue) {
      case 21:
        import("./results21").then(handleSetResult);
        break;
      case 22:
        import("./results22").then(handleSetResult);
        break;
      case 23:
        import("./results23").then(handleSetResult);
        break;
      case 24:
        import("./results24").then(handleSetResult);
        break;
      case 25:
        import("./results25").then(handleSetResult);
        break;
      default:
        break;
    }
  }, [radioValue]);

  useEffect(() => {
    if (!results?.length > 0) return;
    let firstCalculatedResults = calculate(results);
    let resWithOutOdafim = calculate(
      results.map((r) => {
        const { odafim, ...r2 } = r;

        return r2;
      })
    );

    firstCalculatedResults = firstCalculatedResults.map((r, index) => {
      return { ...r, totalWithOut: resWithOutOdafim[index].total };
    });

    setCalculatedResults(firstCalculatedResults);
    changeOrigin && setOriginCalculatedResults(firstCalculatedResults);
    setChangeOrigin(false);
  }, [results]);

  const serverUrl = config.url.SERVER_URL;
  const handleSetResult = ({ results }) => {
    setLoading(true);
    axios
      .get(`${serverUrl}/getData`, {
        params: { website: radioValue },
      })
      .then((res) => {
        console.log(res.data);
        const dataFromSite = res.data;
        results = results.map((res) => {
          const amount = parseInt(
            dataFromSite
              .find((d) => d.letters === res.letters)
              ?.amount.replaceAll(",", "") || res.amount
          );
          return { ...res, amount };
        });
        console.log(results);
        setResults(
          results.map((r) => {
            return { ...r, key: r.letters };
          })
        );
        setLoading(false);
      });
  };

  const onChangeResults = (e) => {
    setChangeOrigin(true);
    let value = e?.target?.value;
    setRadioValue(value);
  };

  return (
    <Grid
      style={{
        width: "100%",
        backgroundColor: "#f0fff0",
      }}
    >
      <Row>
        <Col span={24}>
          <Title mark level={1} style={{ textAlign: "center" }}>
            מחשבון מנדטים - בדר עופר
          </Title>
        </Col>
      </Row>
      <Row>
        <Space>
          <WhatsappShareButton
            separator={"\n\n"}
            children={<WhatsappIcon size={32} round={true} />}
            title={
              "ממליץ לך לבדוק את המחשבון המרתק הזה, מחשבון בחירות המאפשר משחק עם הנתונים וחשיפה לסודות שמאחורי המספרים.\nלמעבר לאתר:"
            }
            url={"https://bader-ofer-calculator.de.r.appspot.com/"}
          />
          <TwitterShareButton
            separator={"\n\n"}
            children={<TwitterIcon size={32} round={true} />}
            title={
              "ממליץ לך לבדוק את המחשבון המרתק הזה, מחשבון בחירות המאפשר משחק עם הנתונים וחשיפה לסודות שמאחורי המספרים.\nלמעבר לאתר:"
            }
            url={"https://bader-ofer-calculator.de.r.appspot.com/"}
            related={["@HaFullstacker"]}
          />
          <TelegramShareButton
            children={<TelegramIcon size={32} round={true} />}
            url={"https://bader-ofer-calculator.de.r.appspot.com/"}
            title={
              "ממליץ לך לבדוק את המחשבון המרתק הזה, מחשבון בחירות המאפשר משחק עם הנתונים וחשיפה לסודות שמאחורי המספרים.\nלמעבר לאתר:"
            }
          />
        </Space>
      </Row>

      <Row>
        <Col span={24}>
          {false ? (
            <Spin />
          ) : (
            <ConfigProvider direction="rtl">
              <Title level={4} style={{ textAlign: "center" }}>
                המידע נשאב בזמן אמת מאתר התוצאות הרשמי
              </Title>
              <Row>
                <Col>
                  <Radio.Group
                    name="radiogroup"
                    disabled={editTable || loading}
                    value={radioValue}
                    onChange={onChangeResults}
                    style={{ textAlign: "center" }}
                  >
                    <Radio value={21}>הכנסת ה-21</Radio>
                    <Radio value={22}>הכנסת ה-22</Radio>
                    <Radio value={23}>הכנסת ה-23</Radio>
                    <Radio value={24}>הכנסת ה-24</Radio>
                    <Radio value={25}>הכנסת ה-25</Radio>
                  </Radio.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button onClick={() => setEditTable(!editTable)}>
                    {editTable ? "שמור" : "ערוך"}
                  </Button>
                </Col>
              </Row>
              <Row>
                {editTable ? (
                  <Col>
                    <EditableTable results={results} setResults={setResults} />
                  </Col>
                ) : (
                  <Col>
                    <Explanation />
                    <br />
                    <p className="showOnlySmallScreens">
                      ניתו לגלול את הטבלה ימינה ושמאלה עבור נתונים נוספים
                    </p>
                    <Table
                      dataSource={calculatedResults
                        .map((cr) => {
                          const origin = originCalculatedResults.find(
                            (ocr) => ocr.letters === cr.letters
                          );
                          return { ...cr, origin };
                        })
                        .sort((cra, crb) => crb.amount - cra.amount)}
                      columns={columns}
                      pagination={false}
                      rowKey={(r) => r.letters}
                      loading={loading}
                    />
                  </Col>
                )}
              </Row>
            </ConfigProvider>
          )}
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6984793202906050560"
            height="847"
            width="504"
            frameBorder="0"
            allowFullScreen=""
            title="Embedded post"
          ></iframe>
        </Col>
        <Col>
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:share:6972615324735008768"
            height="690"
            width="504"
            frameBorder="0"
            allowFullScreen=""
            title="Embedded post"
          ></iframe>
        </Col>
      </Row> */}
    </Grid>
  );
}

export default App;
