import {
	Card,
	CardContent,
	Image,
	CardMeta,
	CardHeader,
	CardDescription,
	Button,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function ActivityDetails() {
	const { activityStore } = useStore();
	const {
		selectedActivity: activity,
		loadActivity,
		loadingInitial,
	} = activityStore;
	const { id } = useParams();

	useEffect(() => {
		if (id) loadActivity(id!);
	}, [id, loadActivity]);

	if (loadingInitial || !activity) return;

	if (loadingInitial) return <LoadingComponent content="Loading activity" />;

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
			<CardContent>
				<CardHeader>{activity.title}</CardHeader>
				<CardMeta>
					<span>{activity.date}</span>
				</CardMeta>
				<CardDescription>{activity.description}</CardDescription>
			</CardContent>
			<CardContent extra>
				<Button.Group widths="2">
					<Button
						as={Link}
						to={`/manage/${activity.id}`}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						as={Link}
						to="/activities"
						basic
						color="blue"
						content="Cancel"
					/>
				</Button.Group>
			</CardContent>
		</Card>
	);
});
