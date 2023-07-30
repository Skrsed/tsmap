import { Card, List } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { selectRoute } from '../slices/map'

const Menu = () => {
  const data = useAppSelector((state) => state.map.routesDetails)
  const dispatch = useAppDispatch()

  const makeOnClick = (id: string) => dispatch(selectRoute(id))
  
  return (
    <Card style={{ width: 384, borderRadius: 0 }}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={({ name, id }) => (
          <List.Item onClick={() => makeOnClick(id)}>{name}</List.Item>
        )}
      />
    </Card>
  )
}

export default Menu