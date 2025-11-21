import { AppDataSource } from "./data-source"
import { Company } from "./entity/Company"
import { Employee } from "./entity/Employee"
// 一对多/多对一关系
async function bootstrap() {
    await AppDataSource.initialize()

    const company = new Company()
    company.name = '农行'
    const employee1 = new Employee()
    employee1.name = '张攀'
    const employee2 = new Employee()
    employee2.name = '李朝阳'

    // 1：只存公司信息，自动级联存员工
    // company.employees = [employee1, employee2]
    // const companyRepository = AppDataSource.getRepository(Company)
    // await companyRepository.save(company)
    
    // 2：先存员工数据，则必须先有公司
    const companyRepository = AppDataSource.getRepository(Company)
    await companyRepository.save(company)
    employee1.company = company
    employee2.company = company
    const employeeRepository = AppDataSource.getRepository(Employee)
    await employeeRepository.save(employee1)
    await employeeRepository.save(employee2)
}

bootstrap()
