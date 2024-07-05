'use client';
import {
  GithubFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Input, Button, Switch, ConfigProvider, theme } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { MenuDataItem } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';
import { usePathname } from 'next/navigation';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const ProLayoutComp = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [pathname, setPathname] = useState('/welcome');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const router = useRouter();
  const currentPathname = usePathname();

  // Tabs related state
  const [activeKey, setActiveKey] = useState('/welcome');
  const [items, setItems] = useState([
    { label: '欢迎', children: '/welcome', key: '/welcome' },
  ]);
  const newTabIndex = useRef(0);

  // Function to find menu item by path
  const findMenuItemByPath = (
    path: string,
    menuItems: MenuDataItem[],
  ): MenuDataItem | undefined => {
    for (const item of menuItems) {
      if (item.path === path) {
        return item;
      }
      if (item.routes) {
        const found = findMenuItemByPath(path, item.routes);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };

  useEffect(() => {
    const newActiveKey = currentPathname;
    console.log('currentPathname', currentPathname); // Debug log

    const newPath = newActiveKey || '/welcome';
    setPathname(newPath);
    router.push(newPath);

    // Add new tab or switch to the existing tab
    const existingTab = items.find((tab) => tab.key === newActiveKey);
    if (!existingTab) {
      const newTabKey = newActiveKey || `newTab${newTabIndex.current++}`;
      const menuItem = findMenuItemByPath(
        newPath,
        (defaultProps.route?.routes as MenuDataItem[]) || [],
      );

      // 获取正确的名称来设置标签页的名称
      const newTabLabel = menuItem?.name || 'New Tab';

      // Ensure unique tabs by avoiding duplicates
      setItems((prevItems) => {
        const newItems = [
          ...prevItems,
          {
            label: newTabLabel,
            children: newPath,
            key: newTabKey,
          },
        ];

        // 去重处理
        const uniqueItems = Array.from(
          new Set(newItems.map((item) => JSON.stringify(item))),
        ).map((item) => JSON.parse(item));

        return uniqueItems;
      });

      setActiveKey(newTabKey);
      console.log('newTabKey', newTabKey); // Debug log
      console.log('items', items); // Debug log
      console.log('defaultProps.route?.routes', defaultProps.route?.routes); // Debug log
    } else {
      setActiveKey(existingTab.key);
      console.log('existingTab', existingTab); // Debug log
    }
  }, [currentPathname, router]);

  useEffect(() => {
    const newActiveKey = items[items.length - 1]?.key;

    if (newActiveKey && !items.find((item) => item.key === activeKey)) {
      setActiveKey(newActiveKey);
    }
  }, [activeKey, items]);

  const onChange = (key: string) => {
    setActiveKey(key);
    // Find the corresponding tab item
    const tabItem = items.find((item) => item.key === key);
    if (tabItem) {
      setPathname(tabItem.children as string);
      router.push(tabItem.children as string);
    }
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems((prevItems) => [
      ...prevItems,
      { label: 'New Tab', children: 'New Tab Pane', key: newActiveKey },
    ]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } =
        newPanes[
          targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
        ];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    console.log('targetKey', targetKey, 'action', action); // Debug log
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
    <div
      onClick={() => {
        const newPath = item.path || '/welcome';
        setPathname(newPath);
        router.push(newPath);

        // Add new tab or switch to the existing tab
        const existingTab = items.find((tab) => tab.key === item.path);
        if (!existingTab) {
          const newTabKey = item.path || `newTab${newTabIndex.current++}`;
          const newTabLabel = item.name || 'New Tab';

          setItems((prevItems) => [
            ...prevItems,
            {
              label: newTabLabel,
              children: newPath,
              key: newTabKey,
            },
          ]);
          setActiveKey(newTabKey);
        } else {
          setActiveKey(existingTab.key);
        }
      }}
    >
      {dom}
    </div>
  );

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeAlgorithm = isDarkTheme
    ? theme.darkAlgorithm
    : theme.defaultAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm: themeAlgorithm,
      }}
    >
      <div
        id="test-pro-layout"
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          siderWidth={256}
          bgLayoutImgList={[
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              left: 85,
              bottom: 100,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
              bottom: -68,
              right: -45,
              height: '303px',
            },
            {
              src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
              bottom: 0,
              left: 0,
              width: '331px',
            },
          ]}
          {...defaultProps}
          location={{
            pathname,
          }}
          avatarProps={{
            src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            title: 'leo',
            size: 'small',
          }}
          actionsRender={(props) => {
            if (props.isMobile) return [];
            return [
              props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                <div
                  key="SearchOutlined"
                  aria-hidden
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginInlineEnd: 24,
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Input
                    style={{
                      borderRadius: 4,
                      marginInlineEnd: 12,
                      backgroundColor: 'rgba(0,0,0,0.03)',
                    }}
                    prefix={
                      <SearchOutlined
                        style={{
                          color: 'rgba(0, 0, 0, 0.15)',
                        }}
                      />
                    }
                    placeholder="搜索方案"
                    variant="borderless"
                  />
                  <PlusCircleFilled
                    style={{
                      color: 'var(--ant-primary-color)',
                      fontSize: 24,
                    }}
                  />
                </div>
              ) : undefined,
              <InfoCircleFilled key="InfoCircleFilled" />,
              <QuestionCircleFilled key="QuestionCircleFilled" />,
              <GithubFilled key="GithubFilled" />,
            ];
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12,
                }}
              >
                <div>© 2021 Made with love</div>
                <div>by Ant Design</div>
              </div>
            );
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuItemRender={menuItemRender}
          breadcrumbRender={false} // Disable breadcrumb rendering
          menuExtraRender={() => (
            <Switch
              checkedChildren="暗黑"
              unCheckedChildren="明亮"
              checked={isDarkTheme}
              onChange={toggleTheme}
            />
          )}
        >
          <PageContainer
            header={{
              ghost: true,
              title: null,
            }}
            tabList={items.map((item) => ({
              tab: item.label,
              key: item.key,
              closable: true,
            }))}
            tabProps={{
              type: 'editable-card',
              hideAdd: true,
              activeKey: activeKey,
              onEdit: (e, action) => onEdit(e, action),
            }}
            onTabChange={onChange}
            fixedHeader // Enable fixed header
            footer={[
              <Button key="3">重置</Button>,
              <Button key="2" type="primary">
                提交
              </Button>,
            ]}
          >
            <ProCard
              style={{
                height: 'calc(100vh - 100px)', // Adjust height to account for Tabs
                minHeight: 800,
                marginTop: '20px',
              }}
            >
              {children}
            </ProCard>
          </PageContainer>
        </ProLayout>
      </div>
    </ConfigProvider>
  );
};

export default ProLayoutComp;
