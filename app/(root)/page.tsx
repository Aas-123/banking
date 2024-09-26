import HeaderBox from '@/components/ui/HeaderBox'
import RightSidebar from '@/components/ui/RightSidebar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.action';

const Home = async () => {
    const loggedIn = await getLoggedInUser();
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                type="greeting"
                title ="Welcome"
                user ={loggedIn?.name || 'Guest'}
                subtext ='Access and manage your account and transactions efficently'
                />

                <TotalBalanceBox 
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1300}
                
                />
            </header>
            RECENT TRANSACRION
        </div>
        
        <RightSidebar

        user = {loggedIn}
        transcations={[]}
        banks={[{currentBalance:123.50 } , {currentBalance:163.50} ]}
        
         />
    </section>
  )
}

export default Home