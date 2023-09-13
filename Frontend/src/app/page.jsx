import Logo from "@/components/Logo"
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className='grancontenedor'>
      <div className="titulo">
        <h1>Smart</h1>
      </div>
      <div className="titulo1">
        <h1>Parking</h1>
      </div>

      <div className="contenedor-flex">
        <div className="divlogo1">
          <Logo className="formlogo" w={500} h={550} color={"#0D5492"} />
        </div>

        <div className="recuadro">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac elit a nisl bibendum pellentesque eu vel mi. Proin bibendum semper ex, fermentum efficitur metus gravida nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur faucibus nibh ut tortor accumsan, a pharetra mi condimentum. In non magna rutrum, semper turpis quis, sodales augue. Pellentesque non ultricies dolor, vitae mattis dui. Integer luctus purus eu odio ullamcorper, quis egestas enim egestas. Aliquam luctus neque laoreet, porta ex tempor, pulvinar leo. Proin eget facilisis justo. Cras finibus iaculis ligula quis convallis. Vestibulum ac dignissim metus.

Aenean enim lacus, venenatis sed tortor a, tempus lobortis libero. Vestibulum condimentum lectus enim, hendrerit egestas lectus feugiat sit amet. Vestibulum justo erat, rhoncus et semper placerat, vehicula sed lectus. Sed et eros at augue ornare auctor. Ut nisl tellus, gravida vel lorem vitae, ultrices efficitur sem. Vestibulum quis massa a magna lacinia fermentum. Vivamus nisl orci, pretium id convallis vitae, consequat a odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec vestibulum lacus nec risus consequat, tempor placerat metus lacinia. Nunc ullamcorper mauris vitae lacinia elementum. Ut ultricies diam ante, at aliquam elit maximus ullamcorper. In ullamcorper nunc risus, gravida vehicula odio pharetra ut.
          </p>
        </div>
      </div>
    </div>
  )
}
