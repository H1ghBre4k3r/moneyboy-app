import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { v4 as uuid } from 'react-native-uuid';

import MoneyDiff, { MoneyDiffProps } from '@components/MoneyDiff';
import Container from '@components/structure/Container';
import Content from '@components/structure/Content';
import Card from '@components/structure/Card';
import List from '@components/structure/List';

const dummyData: MoneyDiffProps[] = [
  {
    name: 'Friend A',
    amount: 14.56,
  },
  {
    name: 'Another Friend',
    amount: -7.13,
  },
  {
    name: 'Some Random Guy',
    amount: 5.69,
  },
];

function renderListItem(i: MoneyDiffProps, index: number, arr: MoneyDiffProps[]) {
  return <MoneyDiff key={uuid()} name={i.name} amount={i.amount} last={index === arr.length - 1} />;
}

function renderList(data: MoneyDiffProps[]) {
  return data.map(renderListItem);
}

export default function MainView() {
  return (
    <>
      <Container>
        <ScrollView style={styles.scrollView}>
          <Content>
            <View style={styles.placeholder} />
            <Card header="Statistics">
              <List data={dummyData} render={renderList} />
            </Card>
          </Content>
          <View style={styles.placeholder} />
        </ScrollView>
        {/* <Footer>
          <Content>
            <PescaButton title="New Payment" onPress={() => console.log('press')} />
          </Content>
        </Footer> */}
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  placeholder: {
    height: 60,
  },
});
