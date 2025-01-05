import { Tailwind, Body, Container, Column, Head, Hr, Html, Img, Link, Preview, Row, Section, Text, Button } from "@react-email/components";

const baseUrl = "https://voxel.hardel.io";

export type EmailProductData = {
    name: string;
    image: string;
    description: string;
    downloadUrl: string;
    date: string;
    price: number;
    quantity: number;
};

function ItemComponent(props: { item: EmailProductData }) {
    return (
        <Section>
            <Hr />
            <Row>
                <Column className="w-16">
                    <Img
                        src={props.item.image}
                        width="64"
                        height="64"
                        alt={props.item.name}
                        className="ml-5 rounded-2xl border border-gray-200/20"
                    />
                </Column>
                <Column className="pl-[22px]">
                    <Text className="text-sm font-semibold m-0 p-0 leading-normal">{props.item.name}</Text>
                    <Text className="text-sm text-gray-600 m-0 p-0 leading-normal">{props.item.description}</Text>
                    <Text className="text-sm text-gray-600 m-0 p-0 leading-normal">{props.item.date}</Text>
                </Column>

                <Column className="align-top w-[100px] px-5" align="right">
                    <Text className="text-sm font-semibold m-0">${props.item.price}</Text>
                    <Text className="m-0 p-0 h-2" />
                    <Button
                        href={props.item.downloadUrl}
                        className="text-sm bg-black rounded-md text-white font-semibold m-0 px-2 py-1"
                        style={{
                            display: "inline-block",
                            textAlign: "center",
                            marginTop: "8px"
                        }}>
                        Download
                    </Button>
                </Column>
            </Row>
        </Section>
    );
}

export default function VoxelReceiptEmail({ items }: { items: EmailProductData[] }) {
    return (
        <Tailwind>
            <Html>
                <Head />
                <Preview>Voxel Receipt</Preview>

                <Body className="bg-white" style={main}>
                    <Container className="mx-auto py-5 pb-12 w-[660px] max-w-full">
                        <Section>
                            <Row>
                                <Column className="table-cell">
                                    <Img
                                        src={`${baseUrl}/public/images/branding/voxel_black.webp`}
                                        width="42"
                                        height="42"
                                        alt="Voxel Logo"
                                    />
                                </Column>

                                <Column align="right" className="table-cell">
                                    <Text className="text-3xl font-light text-gray-500">Receipt</Text>
                                </Column>
                            </Row>
                        </Section>
                        <Hr />
                        <Section className="my-10">
                            <Row>
                                <Column align="center">
                                    <Text style={{ width: "60%" }} className="text-5xl font-light tracking-tight text-black">
                                        Thank you for your purchase!
                                    </Text>
                                </Column>
                            </Row>
                            <Row>
                                <Column align="center">
                                    <Text style={{ width: "85%" }} className="text-2xl font-light text-zinc-700">
                                        This means a lot to us, and Voxel will be able to offer even more. Don't hesitate to tell us what
                                        you think of your purchase.
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Section className="mt-8 mb-4 h-6 rounded-full">
                            <Text className="bg-zinc-100 rounded-full px-4 text-sm font-medium m-0 py-2">Voxel Marketplace</Text>
                        </Section>

                        <Section>
                            {items.map((item) => (
                                <ItemComponent key={item.name} item={item} />
                            ))}
                        </Section>
                        <Hr className="mt-8" />
                        <Section align="right">
                            <Row>
                                <Column align="right" className="table-cell">
                                    <Text className="m-0 text-gray-600 text-[10px] font-semibold pr-8 text-right">TOTAL</Text>
                                </Column>
                                <Column className="h-12 border-l border-gray-200" />
                                <Column className="table-cell w-[90px]">
                                    <Text className="m-0 mr-5 text-base font-semibold whitespace-nowrap text-right">
                                        ${items.reduce((acc, item) => acc + item.price, 0)}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>
                        <Hr className="mt-8" />
                        <Section>
                            <Row>
                                <Column align="center" className="block">
                                    <Img
                                        src={`${baseUrl}/public/images/branding/voxel_black.webp`}
                                        width="26"
                                        height="26"
                                        alt="Voxel Logo"
                                    />
                                </Column>
                            </Row>
                        </Section>
                        <Text className="mt-6 text-center text-xs text-gray-600">
                            Copyright © 2025 Voxel. <br />
                            <Link href="https://voxel.hardel.io/legal/">All rights reserved</Link>
                        </Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}

const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif'
};
