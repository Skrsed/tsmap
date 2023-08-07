import { Card } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { RouteDetails, selectRoute } from '../slices/map'
import type { MenuProps } from 'antd'
import { Menu as AntMenu } from 'antd'
import s from './style.module.css'

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const makeItems = (data: RouteDetails[]) => {
  const items: MenuItem[] = data
    .map(({ id, name }: RouteDetails) => {
      return getItem(name, id)
    })

  return [getItem('Маршруты', 'grp', null, items, 'group')]
}


const Menu = () => {
  const data = useAppSelector((state) => state.map.routesDetails)
  const selectedId = useAppSelector((state) => state.map.selectedRouteId) || ''

  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = makeItems(data)

  const onClick: MenuProps['onClick'] = ({ key: id }) =>
    dispatch(selectRoute(id))

  return (
    <Card className={s.card}>
      <AntMenu
        onClick={onClick}
        selectedKeys={[selectedId]}
        mode="inline"
        items={items}
        className={s.routeItems}
      />
    </Card>
  )
}

export default Menu