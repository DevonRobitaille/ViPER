import { useRouter } from "next/router"
import PEREditFORM from "../components/perEditForm"


function Edit() {
    const router = useRouter()
    const { id } = router.query
    if (!id || typeof id !== "string" || Array.isArray(id)) router.push('/reports')

    return <PEREditFORM id={id
        ? typeof id === "string"
            ? !Array.isArray(id)
                ? id
                : ""
            : ""
        : ""} />
}

export default Edit