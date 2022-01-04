import { LogoutButton } from '@components/extended/LogoutButton';
import { createPescaNavigation } from '@components/navigation/pesca-navigator/createPescaNavigation';
import { PescaNavigatorProps } from '@components/navigation/pesca-navigator/pescaNavigator';
import { ScreenComponentProps } from '@components/navigation/pesca-navigator/pescaScreen';
import { Content } from '@components/structure/Content';
import { ListItem } from '@components/structure/ListItem';
import { SectionHeader } from '@components/structure/SectionHeader';
import { AuthContext } from '@context/AuthContext';
import { StyleContext } from '@context/StyleContext';
import React, { useContext } from 'react';
import { DefaultSectionT, SectionList, SectionListRenderItemInfo, StyleSheet } from 'react-native';

type SettingsViewProps = PescaNavigatorProps;

type SettingsViewListEntry = {
  id: string;
  content: JSX.Element;
};

type SettingsViewListData = {
  title: unknown;
  data: SettingsViewListEntry[];
};

const Pesca = createPescaNavigation();

type SettingsMainViewParams = unknown;

const SettingsMainView: React.FC<ScreenComponentProps<SettingsMainViewParams>> = ({ navigation }) => {
  const { user, loggedIn } = useContext(AuthContext);

  const { Content: Contents } = useContext(StyleContext);

  const styles = StyleSheet.create({
    header: {
      backgroundColor: Contents.background.dp16,
    },
  });

  const data: SettingsViewListData[] = [];

  function renderItem({ item: { content } }: SectionListRenderItemInfo<SettingsViewListEntry, DefaultSectionT>) {
    return content;
  }

  return (
    <>
      <SectionHeader
        key={'settings-displayname'}
        header={user?.displayName ?? 'Settings'}
        headerContainerStyle={[styles.header]}
      />
      <SectionList
        sections={data}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        renderSectionHeader={({ section: { title } }) => title}
        scrollEnabled={false}
      />
      {loggedIn && (
        <Content>
          <ListItem last>
            <LogoutButton onPress={navigation.close} />
          </ListItem>
        </Content>
      )}
    </>
  );
};

export const SettingsView: React.FC<SettingsViewProps> = ({ isOpen, setOpen }) => (
  // TODO lome: Add structure for menu points
  <Pesca.Navigator setOpen={setOpen} isOpen={isOpen}>
    <Pesca.Screen name="SettingsMainScreen" component={SettingsMainView} />
  </Pesca.Navigator>
);
