import React, { useState } from "react";
import { Select, Typography, Card, Row, Col } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "https://i.ibb.co/Z11pcGG/cryptocurrency.png";

export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 20,
  });
  const { data: cryptoData } = useGetCryptosQuery(100);
  console.log("🚀 ~ News ~ count:", data);

  if (isFetching) return "Loading...";

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              value={newsCategory}
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency"></Option>
              {cryptoData?.data?.coins.map((coin) => (
                <Option key={coin.uuid} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        {data.articles.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card" style={{ height: "100%" }}>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.title}
                  </Title>
                  <img src={news.urlToImage || demoImage} alt="news" />
                </div>
                <p>
                  {news.content > 100
                    ? `${news.content.substring(0, 100)}`
                    : news.content}
                </p>

                <div className="provider-container">
                  <div>
                    <Text>{news.author}</Text>
                  </div>
                  <Text>
                    {moment(news.publishedAt).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
